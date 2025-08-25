import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostTitle } from "@/app/_components/post-title";
import markdownToHtml from "@/lib/markdownToHtml";
import { getStaticPageBySlug } from "@/lib/pages";

export default async function TermsPage() {
  const page = getStaticPageBySlug("terms");
  const content = await markdownToHtml(page?.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostTitle>{page?.title || "Terms and Conditions"}</PostTitle>
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}


