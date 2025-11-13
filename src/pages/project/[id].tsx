import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Layout from "@/layout/main";
import HeadMeta from "@/components/headermeta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const { status } = useSession();
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    currencies: "",
  });

  // tRPC queries and mutations
  const { data: project, isLoading, error } = trpc.projects.get.useQuery(
    { id: (id as string) || "" },
    { enabled: !!id }
  );

  const updateProjectMutation = (trpc.projects as any).update.useMutation({
    onSuccess: () => {
      setSaveMessage("プロジェクトを更新しました");
      setTimeout(() => setSaveMessage(null), 3000);
      setIsSaving(false);
    },
    onError: (error: any) => {
      setSaveMessage(`エラー: ${error.message}`);
      setIsSaving(false);
    },
  });

  // Initialize form with project data
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
        currencies: Array.isArray(project.currencies) 
          ? project.currencies.join(", ")
          : project.currencies || "",
      });
    }
  }, [project]);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error || !project) {
    return (
      <Layout>
        <HeadMeta
          pageTitle="Project Edit"
          pageDescription="Edit project"
          pagePath={`/project/${id}`}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-2 mb-6">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          </div>

          <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error?.message || "プロジェクトが見つかりません"}</span>
          </div>
        </div>
      </Layout>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setSaveMessage("プロジェクト名を入力してください");
      return;
    }

    if (!formData.currencies.trim()) {
      setSaveMessage("通貨を入力してください");
      return;
    }

    const currenciesArray = formData.currencies
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    setIsSaving(true);
    updateProjectMutation.mutate({
      id: project.id,
      name: formData.name,
      description: formData.description || undefined,
      currencies: currenciesArray,
    });
  };

  return (
    <Layout>
      <HeadMeta
        pageTitle={`Edit: ${project.name}`}
        pageDescription="Edit project"
        pagePath={`/project/${id}`}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="flex gap-2 mb-6">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">プロジェクト編集</h1>
          <p className="text-gray-500 dark:text-gray-400">
            ID: {project.projectId}
          </p>
        </div>

        {/* Status Message */}
        {saveMessage && (
          <div className={`mb-4 p-4 rounded-lg ${
            saveMessage.startsWith("エラー")
              ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200"
              : "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200"
          }`}>
            {saveMessage}
          </div>
        )}

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
            <CardDescription>
              プロジェクトの基本情報を編集します
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  プロジェクト名
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="プロジェクト名を入力"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  説明
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white h-24 resize-none"
                  placeholder="プロジェクトの説明（オプション）"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  通貨（カンマ区切り）
                </label>
                <input
                  type="text"
                  value={formData.currencies}
                  onChange={(e) =>
                    setFormData({ ...formData, currencies: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="USD, EUR, JPY"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSaving || updateProjectMutation.isPending}
                >
                  {isSaving || updateProjectMutation.isPending ? "保存中..." : "保存"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  キャンセル
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Project Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>プロジェクト情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">作成者</p>
                <p className="font-medium">{project.creator}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">作成日時</p>
                <p className="font-medium">
                  {new Date(project.createdAt).toLocaleString("ja-JP")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
