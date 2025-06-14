import { useState } from "react";
import { Download, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { appExporter } from "@/lib/appExporter";

export default function AppExportButton() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    if (isExporting) return;

    setIsExporting(true);
    
    try {
      // Simulate export preparation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await appExporter.exportApp();
      
      setExportComplete(true);
      setTimeout(() => {
        setExportComplete(false);
        setIsExporting(false);
      }, 3000);
      
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const getButtonContent = () => {
    if (exportComplete) {
      return (
        <>
          <CheckCircle className="h-4 w-4 text-green-400" />
          <span className="ml-2">ダウンロード完了!</span>
        </>
      );
    }
    
    if (isExporting) {
      return (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="ml-2">アプリを生成中...</span>
        </>
      );
    }
    
    return (
      <>
        <Download className="h-4 w-4" />
        <span className="ml-2">📱 URLPlayerアプリを保存</span>
      </>
    );
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {getButtonContent()}
      </Button>
      
      <div className="text-xs text-gray-400 text-center space-y-1">
        <p>完全なスタンドアロンHTMLアプリ</p>
        <p>インターネット接続不要で動作</p>
        <p>全機能をオフラインで使用可能</p>
      </div>
    </div>
  );
}