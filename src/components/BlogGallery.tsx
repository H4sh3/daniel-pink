import { BlogCard } from './BlogCard';

export interface IFrontmatter {
    title: string;
    description: string;
    pubDate: string;
    imgSrc: string;
    imgAlt: string;
}

// Workaround to import Astro type. Otherwise, it'll have some compilation errors
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type Page<T> = import('astro').Page<T>;
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export type MarkdownInstance<T> = import('astro').MarkdownInstance<T>;

export type FrontmatterPage = Page<MarkdownInstance<IFrontmatter>>;

type IRecentPostsProps = {
    postList: MarkdownInstance<IFrontmatter>[];
};

const BlogGallery = (props: IRecentPostsProps) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {props.postList.map((elt) => (
            <BlogCard key={elt.url} instance={elt} />
        ))}
    </div>
);

export { BlogGallery };