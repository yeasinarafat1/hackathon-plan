"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FiUpload,
  FiX,
  FiFile,
  FiImage,
  FiVideo,
  FiFileText,
} from "react-icons/fi";
import { useState } from "react";
import { createComplaint } from "@/lib/action/complain.action";
import { useToast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    isAnonymous: z.enum(["yes", "no"]),
    complaintType: z.string().min(1, "Please select a complaint type"),
    description: z
      .string()
      .min(20, "Description must be at least 20 characters"),
    email: z.union([z.string().email().optional(), z.literal("")]).optional(),
  })
  .refine((data) => (data.isAnonymous === "no" ? data.email : true), {
    message: "Email is required for non-anonymous complaints",
    path: ["email"],
  });

const ComplainFormPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAnonymous: "no",
      complaintType: "",
      description: "",
      email: "",
    },
  });

  const complaintTypes = [
    "Bribery",
    "Harassment",
    "Theft",
    "Vandalism",
    "Fraud",
    "Assault",
    "Other",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <FiImage className="w-5 h-5" />;
    if (file.type.startsWith("video/")) return <FiVideo className="w-5 h-5" />;
    if (file.type === "application/pdf")
      return <FiFileText className="w-5 h-5" />;
    return <FiFile className="w-5 h-5" />;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const result = await createComplaint(values, files);
    if (result?.$id) {
      toast({
        title: "Success",
        description: "Complaint created successfully",
        className: "bg-green-500 text-white",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to create complaint",
        className: "bg-red-500 text-white",
      });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          File a Complaint
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Anonymous Selection */}
            <FormField
              control={form.control}
              name="isAnonymous"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Submit anonymously?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select anonymity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="yes">Yes</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field (Conditional) */}
            {form.watch("isAnonymous") === "yes" && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Email (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Complaint Type Selection */}
            <FormField
              control={form.control}
              name="complaintType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Complaint</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select complaint type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {complaintTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Textarea */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide detailed information about the incident..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* File Upload Section */}
            <div>
              <FormLabel>Attach Evidence</FormLabel>
              <div className="flex items-center justify-center w-full mt-2">
                <label className="flex flex-col w-full border-2 border-dashed rounded-lg h-32 cursor-pointer hover:border-blue-500 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 text-center">
                      Click to upload or drag and drop
                      <br />
                      (Max 5 files, Supported formats: PNG, JPG, PDF, DOC, MP3,
                      MP4)
                    </p>
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*, .pdf, .doc, .docx, audio/*, video/*"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>

              {/* File Previews */}
              {files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getFileIcon(file)}
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {Math.round(file.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <FiX className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              {loading ? "Submitting..." : "Submit Complaint"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ComplainFormPage;
