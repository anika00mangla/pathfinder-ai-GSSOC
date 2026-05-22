"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { entrySchema } from "@/app/lib/schema";
import { Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { improveWithAI } from "@/actions/resume";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";

const formatDisplayDate = (dateString) => {
  if (!dateString) return "";
  const date = parse(dateString, "yyyy-MM", new Date());
  return format(date, "MMM yyyy");
};

export function EntryForm({ type, entries, onChange }) {
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit: handleValidation,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      title: "",
      organization: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  });

  const {
    loading: isImproving,
    fn: improveDescriptionFn,
    data: improvedDescription,
    error: improveError,
  } = useFetch(improveWithAI);

  // Sync improved description from useFetch hook data safely
  useEffect(() => {
    if (improvedDescription) {
      setValue("description", improvedDescription);
      toast.success("Description updated and polished with AI insights!");
    }
    if (improveError) {
      toast.error(improveError.message || "Failed to improve description.");
    }
  }, [improvedDescription, improveError, setValue]);

  const handleImproveDescription = async () => {
    const currentDescription = watch("description");
    if (!currentDescription?.trim()) {
      toast.error("Please enter some description content first to optimize.");
      return;
    }
    await improveDescriptionFn({ current: currentDescription, type });
  };

  const handleAdd = handleValidation((data) => {
    const updatedEntries = [...entries, data];
    onChange(updatedEntries);
    reset();
    setIsAdding(false);
  });

  const handleRemove = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    onChange(updatedEntries);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {entries.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-3 border rounded-lg bg-muted/40 relative group"
          >
            <div>
              <p className="font-semibold text-sm">
                {item.title} @ {item.organization}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDisplayDate(item.startDate)} -{" "}
                {item.current ? "Present" : formatDisplayDate(item.endDate)}
              </p>
              {item.description && (
                <p className="text-xs text-muted-foreground mt-2 whitespace-pre-line line-clamp-3">
                  {item.description}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(index)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove entry</span>
            </Button>
          </div>
        ))}
      </div>

      {isAdding && (
        <Card className="border-2 border-primary/20">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-semibold text-left">
              Add {type} Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="entry-title" className="text-sm font-medium">
                  Title / Role
                </label>
                <Input
                  id="entry-title"
                  placeholder="e.g. Senior Software Engineer"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="entry-organization" className="text-sm font-medium">
                  Organization / Company
                </label>
                <Input
                  id="entry-organization"
                  placeholder="e.g. Google"
                  {...register("organization")}
                />
                {errors.organization && (
                  <p className="text-xs text-red-500">
                    {errors.organization.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="entry-startDate" className="text-sm font-medium">
                  Start Date
                </label>
                <Input
                  id="entry-startDate"
                  type="month"
                  {...register("startDate")}
                />
                {errors.startDate && (
                  <p className="text-xs text-red-500">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="entry-endDate" className="text-sm font-medium">
                  End Date
                </label>
                <Input
                  id="entry-endDate"
                  type="month"
                  disabled={watch("current")}
                  {...register("endDate")}
                />
                {errors.endDate && (
                  <p className="text-xs text-red-500">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <input
                id="entry-current"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                {...register("current")}
              />
              <label htmlFor="entry-current" className="text-sm font-medium cursor-pointer">
                I am currently working / studying here
              </label>
            </div>

            <div className="space-y-2">
              <label htmlFor="entry-description" className="text-sm font-medium">
                Description / Highlights
              </label>
              <Textarea
                id="entry-description"
                rows={4}
                placeholder="Detail key tasks, achievements, and metrics tracking your impact..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleImproveDescription}
              disabled={isImproving || !watch("description")?.trim()}
            >
              {isImproving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve with AI
                </>
              )}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2 pt-2 pb-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setIsAdding(false);
              }}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleAdd}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </CardFooter>
        </Card>
      )}

      {!isAdding && (
        <Button
          className="w-full"
          variant="outline"
          onClick={() => setIsAdding(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add {type}
        </Button>
      )}
    </div>
  );
}
