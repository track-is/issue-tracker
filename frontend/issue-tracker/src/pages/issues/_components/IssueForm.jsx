"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { toast } from "react-toastify";
import { useCreateIssue, useUpdateIssue } from "../../api/issue.api";
import { InputFieldError, Spinner } from "../../components";
import { createIssueSchema } from "../../validation/createIssueSchema";

const IssueForm = ({ issue }) => {
  const [error, setError] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const router = useRouter();
  
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createIssueSchema),
  });

  const { isSuccess: isUpdateSuccessfull, mutate: update } = useUpdateIssue();
  const { isSuccess: isCreateSuccessfull, mutate: create } = useCreateIssue();

  const onSubmit = handleSubmit((data) => {
    setIsFormSubmitting(true);
    try {
      if (issue) {
        const payload = {
          id: issue?.id,
          data: {
            title: data?.title,
            status: issue?.status,
            description: data?.description,
          },
        };
        update(payload);
      } else {
        const payload = {
          data: {
            title: data.title,
            status: "OPEN",
            description: data.description,
          },
        };
        create(payload);
      }
    } catch (err) {
      setIsFormSubmitting(false);
      setError(true);
    }
  });

  function showIssueCreateOrUpdateToast(action) {
    let msg = "";
    if (action == "create") msg = "Issue Added";
    if (action == "update") msg = "Issue Updated";
    toast(msg, {
      toastId: "issue-op",
      type: "success",
    });
  }

  if (isCreateSuccessfull) router.push("/issues");
  if (isUpdateSuccessfull) {
    router.push(`/issues/${issue.id}`);
  }

  return (
    <div className="max-w-xl">
      {isCreateSuccessfull ? (
        <div>{showIssueCreateOrUpdateToast("create")}</div>
      ) : null}
      {isUpdateSuccessfull ? (
        <div>{showIssueCreateOrUpdateToast("update")}</div>
      ) : null}
      {error && <InputFieldError message={"Something went wrong!"} />}
      <form className="space-y-3" onSubmit={onSubmit}>
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-3xl dark:text-white">
          Type in issue details
        </h1>
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        {errors.title && <InputFieldError message={errors.title.message} />}
        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} ref={null} />
          )}
        />
        {errors.description && (
          <InputFieldError message={errors.description.message} />
        )}

        <Button disabled={isFormSubmitting}>
          {issue ? "Update Issue" : "Create new Issue"}{" "}
          {isFormSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
