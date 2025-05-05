"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "@app/libs/components/page-header";
import styles from "./style.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "@app/libs/components/input";
import usePost from "@app/libs/utilities/hooks/usePost";
import EmptyState from "@app/libs/components/empty-state";
import useDebounce from "@app/libs/utilities/hooks/useDebounce";
import PageLoader from "@app/libs/components/section-loader";
import PostCard from "@app/libs/components/card/post-card";

const PostPage: React.FC = () => {
  const methods = useForm();
  const { getList, list } = usePost();
  const [search, setSearch] = useState<number | undefined>(undefined);
  const { debounce, loading: isSearching } = useDebounce((value?: string) => {
    if (value) {
      setSearch(parseInt(value));
    } else {
      setSearch(undefined);
    }
  }, 700);

  const { data: posts, pending, success } = list;

  useEffect(() => {
    getList({
      userId: search,
    });
  }, [getList, search]);

  return (
    <div>
      <PageTitle
        title="Post List"
        subtitle="List of post from JSONPlaceholder"
      />
      <section className={styles.section}>
        <FormProvider {...methods}>
          <form>
            <InputField
              id="task"
              name="task"
              label="Search Post by User Id"
              isLoading={isSearching}
              inputProps={{
                type: "text",
                required: true,
                placeholder: "Input user id here",
                onChange: (e) => debounce(e.currentTarget.value),
              }}
            />
          </form>
        </FormProvider>
        <div className={styles.search_section}>
          {search && success && !pending && (
            <h6 className={styles.search_section_result}>
              {posts.length} search result found for user ID:{" "}
              <span>{search}</span>
            </h6>
          )}
        </div>
        <div className={styles.posts_section}>
          {!pending &&
            success &&
            posts?.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          {/* List of Post */}
          {pending && <PageLoader title="Fetching Post List" />}
          {/* Empty State */}
          {!pending && success && posts?.length <= 0 && (
            <EmptyState
              title={
                search
                  ? `No results found for user ID "${search}".`
                  : "Oops, something went wrong with the JSONPlaceholder API."
              }
              subtitle={
                search
                  ? "Try adjusting your search or filter criteria."
                  : "Please try again later or check your connection."
              }
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default PostPage;
