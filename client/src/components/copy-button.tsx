import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  text: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function CopyButton({ text, variant = "outline", size = "sm", className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Kopiert",
        description: "Text wurde in die Zwischenablage kopiert.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Text konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={copyToClipboard}
      variant={variant}
      size={size}
      className={className}
      disabled={!text}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Kopiert
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          Kopieren
        </>
      )}
    </Button>
  );
}