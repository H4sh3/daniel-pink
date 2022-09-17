---
layout: '@/templates/BasePost.astro'
title: Analyzing Nginx access.log files with python
description: Analyzing Nginx access.log files with python
pubDate: 2021-09-16T00:00:00Z
imgSrc: '/assets/images/blog/nginx.png'
imgAlt: 'Image post'
---

<div class="flex flex-col">
    <a href="https://github.com/H4sh3/nginx-log-inspect" target="_blank">Code</a>
</div>

While inspecting the nginx logs of my server, I noticed some strange requests and started a little investigation.

Under ubuntu nginx logs are located at **/var/logs/nginx/**, the logs a split into two categories acccess and error logs.
The current log file that is written to is named access.log, every day theses files get stored as gzip with this name pattern access.log.2.gz, access.log.3.gz, and so on.

Back to were is was inspecting the logs, I noticed quite a few requests to urls that make no sense on my server, for example:


**wp-login.php request**
```
209.159.150.110 01/Sep/2022:20:07:13 +0000 /wp-login.php  178 - Mozilla/5.0 (Windows NT 10.0; Win64; x64rv:95.0) Gecko/20100101 Firefox/95.0 301 GET
```

I don't have wordpress installed, many of these requests are made by bots and scanners to find what software is installed and afterwards try to bruteforce weak login credentials or scan for known vulnerable software installed on the server.

There are also many legit requests, for example a request by the PetalBot checking the content of robots.txt or requests to resources that actually exist on the server.

**robots.txt request**
```
114.119.139.104 - - [01/Sep/2022:14:08:39 +0000] "GET /robots.txt HTTP/1.1" 200 73 "-" "Mozilla/5.0 (compatible;PetalBot;+https://webmaster.petalsearch.com/site/petalbot)"
```

I was wondering were all these requests come from and started writing a python script to make a little analysis of the log files.

# Getting the logs in a more useable format

The nginx log files are lines of log messages similar to the messages above.
They consist of the following fields

 - ip
 - date of request
 - requested url
 - request size
 - referrer
 - useragent
 - status code
 - http method

To make things easier I started to extract and transform the information in each log data to an object.
The power of google strikes as I find a neat "little" regular expression that can be used to parse the log messages.

(The regex fails for some message, I haven't looked into that yet. Maybe those messages are malformed or the regex can be improved.)

```
lineformat = re.compile(r"""(?P<ipaddress>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}) - - \[(?P<dateandtime>\d{2}\/[a-z]{3}\/\d{4}:\d{2}:\d{2}:\d{2} (\+|\-)\d{4})\] ((\"(GET|POST) )(?P<url>.+)(http\/1\.1")) (?P<statuscode>\d{3}) (?P<bytessent>\d+) (["](?P<refferer>(\-)|(.+))["]) (["](?P<useragent>.+)["])""", re.IGNORECASE)

log_message ='209.159.150.110 - - [01/Sep/2022:20:07:13 +0000] "GET /wp-login.php HTTP/1.1" 301 178 "-" "Mozilla/5.0 (Windows NT 10.0; Win64; x64rv:95.0) Gecko/20100101 Firefox/95.0"'

data = re.search(lineformat, log_message)
datadict = data.groupdict()
print(datadict)
----
{
    'ipaddress': '**REDACTED**',
    'dateandtime': '01/Sep/2022:20:07:13 +0000',
    'url': '/wp-login.php ',
    'statuscode': '301',
    'bytessent': '178',
    'refferer': '-',
    'useragent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64rv:95.0) Gecko/20100101 Firefox/95.0'
}
```

Going over all log messages from the last month I build a list of the logs dictionaries.

# Adding the country of each IP using a geolocation api

```
import json
import time
import urllib.request

GEO_IP_API_URL  = 'http://ip-api.com/json/'
def country_of_ip(ip):
    while(True):
        try:
            req = urllib.request.Request(GEO_IP_API_URL+ip)
            response = urllib.request.urlopen(req).read()
            json_response = json.loads(response.decode('utf-8'))
            return json_response['country']
        except:
            print("sleeping")
            time.sleep(61)
```

This api was easy to use but it has a request limit of 45 per 1 minute.
Every time we get an exception we hit the rate limit, wait for 1 minute and go again.

Our log messages will include duplicated IP's we don't want to request them multiple times.
Therefore we keep a dict on the side, if an IP has already been looked up, we use the value from the dict.

# Restructure to ip->message dict

Our log message dict objects look likes this now
```
{
    'ipaddress': '209.159.150.110',
    'dateandtime': '01/Sep/2022:20:07:13 +0000',
    'url': '/wp-login.php ',
    'statuscode': '301',
    'bytessent': '178',
    'refferer': '-',
    'useragent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64rv:95.0) Gecko/20100101 Firefox/95.0',
    'country': 'United States'
}
```

Instead of using a list with our logs, lets transform the data structure a little more.

Building a **dict** were the **keys** are the **ip's** of our requests and the **values** are a **list of the log dictionaries** coming from that ip.

# Transformed data format

The final form looks like bellow, this way we can easily inspect IP's we want to look further into.

```
{
    "192.168.178.2":[
        {
            "url":...,
            "country":...,
        },
        {
            "url":...,
            "country":...,
        },
        ...
    ],
    "192.168.178.3":[
        {
            "url":...,
            "country":...,
        },
        ...
    ]
    ...
}
```
# Analyze & Statistics

All statistics functions use the same input data structure we generated above.

The data I used are the logs from this server over the last 14 days.


```
- - - Unique ip's - - -
Found 1529 unique ip adresses from 61 countries!



- - - Top 10 most common user agents - - -
Requests: 3307	Useragent: Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)
Requests: 1921	Useragent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36
Requests: 572	Useragent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36
Requests: 468	Useragent: Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)
Requests: 405	Useragent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:103.0) Gecko/20100101 Firefox/103.0
Requests: 403	Useragent: Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)
Requests: 296	Useragent: -
Requests: 272	Useragent: Go-http-client/1.1
Requests: 246	Useragent: Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.1.5) Gecko/20091102 Firefox/3.5.5 (.NET CLR 3.5.30729)
Requests: 238	Useragent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36


- - - Top 10 most common countries - - -
Requests: 626	 Country: United States
Requests: 253	 Country: France
Requests: 81	 Country: Singapore
Requests: 78	 Country: Germany
Requests: 66	 Country: Russia
Requests: 54	 Country: Netherlands
Requests: 37	 Country: United Kingdom
Requests: 29	 Country: China
Requests: 28	 Country: Ireland
Requests: 25	 Country: Finland


- - - Top 10 most common status codes - - -
Requests: 6047	Statuscode: 200 ->	OK
Requests: 4232	Statuscode: 404 ->	Not Found
Requests: 763	Statuscode: 301 ->	Moved Permanently
Requests: 732	Statuscode: 304 ->	Not Modified
Requests: 610	Statuscode: 400 ->	Bad Request
Requests: 77	Statuscode: 405 ->	Method Not Allowed
Requests: 65	Statuscode: 403 ->	Forbidden
Requests: 28	Statuscode: 502 ->	Bad Gateway
Requests: 8	Statuscode: 206 ->	Partial Content
Requests: 3	Statuscode: 302 ->	Found


- - - Top 10 most common ip adresses - - -
Requests: 3729	IP: **REDACTED**
Requests: 2066	IP: **REDACTED**
Requests: 502	IP: **REDACTED**
Requests: 246	IP: **REDACTED**
Requests: 208	IP: **REDACTED**
Requests: 161	IP: **REDACTED**
Requests: 144	IP: **REDACTED**
Requests: 138	IP: **REDACTED**
Requests: 125	IP: **REDACTED**
Requests: 119	IP: **REDACTED**


- - - Top 100 most common urls requested by **REDACTED** - - -
Requests: 3	 Url: /system_api.php 
Requests: 3	 Url: /c/version.js 
Requests: 3	 Url: /streaming/clients_live.php 
Requests: 3	 Url: /stalker_portal/c/version.js 
Requests: 3	 Url: /stream/live.php 
Requests: 3	 Url: /flu/403.html 
Requests: 3	 Url: / 


- - - Top 10 most common urls for status code 301 -> Moved Permanently- - -
Requests:119	Url: /projects/sorting 
Requests:87	Url: / 
Requests:29	Url: /projects 
Requests:29	Url: /projects/rl-maze 
Requests:28	Url: /projects/genetic-rocket 
Requests:26	Url: /projects/gravity 
Requests:25	Url: /projects/gymcadia 
Requests:25	Url: /projects/game-of-life 
Requests:15	Url: /robots.txt 
Requests:10	Url: /tasks
```

# Final thoughts

Surely this is no rocket science but it was a fun little project and I have some more ideas on what to do with the data.

While inspecting the log's, I also found a little issue were some links caused unnecessary redirects.

<div class="flex flex-col">
    <a href="https://github.com/H4sh3/nginx-log-inspect" target="_blank">Code</a>
</div>
