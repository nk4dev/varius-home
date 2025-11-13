import Layout from "@/layout/main";
import HeadMeta from "@/components/headermeta";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import MotionWrapper from "@/components/animation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";

interface Project {
  id: string;
  name: string;
  projectId: string;
  description: string | null;
  creator: string;
  currencies: string[];
  createdAt: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    currencies: "",
  });

  // tRPC queries and mutations
  const { data: projectsData, isLoading, error, refetch } = trpc.projects.list.useQuery({
    page: 1,
    perPage: 3,
  });

  const createProjectMutation = trpc.projects.create.useMutation({
    onSuccess: () => {
      setNewProject({ name: "", description: "", currencies: "" });
      setShowNewProjectForm(false);
      refetch();
    },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const projects: Project[] = projectsData?.items || [];

  const handleCreateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newProject.name.trim()) {
      return;
    }

    if (!newProject.currencies.trim()) {
      return;
    }

    const currenciesArray = newProject.currencies
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    createProjectMutation.mutate({
      projectName: newProject.name,
      description: newProject.description || undefined,
      creator: session?.user?.email || "unknown",
      currencies: currenciesArray,
    });
  };

  return (
    <Layout>
      <HeadMeta
        pageTitle="Dashboard"
        pageDescription="View your dashboard and manage projects"
        pagePath="/dashboard"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <MotionWrapper s={0.2} style="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400">
                プロジェクトを管理します
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Badge variant="outline">Active</Badge>
            </div>
          </div>
        </MotionWrapper>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg flex gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{error.message}</span>
          </div>
        )}

        {/* New Project Form */}
        {showNewProjectForm && (
          <MotionWrapper s={0.3} style="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>新しいプロジェクトを作成</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      プロジェクト名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newProject.name}
                      onChange={(e) =>
                        setNewProject({ ...newProject, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="プロジェクト名を入力"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      説明
                    </label>
                    <input
                      type="text"
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject({ ...newProject, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="プロジェクトの説明"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      通貨（カンマ区切り） <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newProject.currencies}
                      onChange={(e) =>
                        setNewProject({ ...newProject, currencies: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      placeholder="USD, EUR, JPY"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" disabled={createProjectMutation.isPending}>
                      {createProjectMutation.isPending ? "作成中..." : "作成"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowNewProjectForm(false)}
                    >
                      キャンセル
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </MotionWrapper>
        )}

        {/* Projects Section */}
        <MotionWrapper s={0.4} style="">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">最近のプロジェクト</h2>
              <p className="text-gray-500 dark:text-gray-400">
                {projects.length}個のプロジェクト
              </p>
            </div>
            <Button
              onClick={() => setShowNewProjectForm(!showNewProjectForm)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              新規作成
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : projects.length === 0 ? (
            <Card>
              <CardContent className="pt-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  プロジェクトがありません
                </p>
                <Button onClick={() => setShowNewProjectForm(true)}>
                  最初のプロジェクトを作成
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(`/projects`)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="text-xs text-gray-400">
                      ID: {project.projectId}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {project.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    )}
                    <div>
                      <p className="text-xs text-gray-400 mb-2">通貨</p>
                      <div className="flex flex-wrap gap-1">
                        {project.currencies.map((currency) => (
                          <Badge key={currency} variant="outline">
                            {currency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">
                      作成: {new Date(project.createdAt).toLocaleDateString("ja-JP")}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </MotionWrapper>
      </div>
    </Layout>
  );
}
