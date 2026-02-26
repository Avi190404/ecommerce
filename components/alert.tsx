"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface CartErrorAlertProps {
  title?: string;         // Dynamic Header
  errorMessage: string | null;
  onClose: () => void;
}

export function CartErrorAlert({ title, errorMessage, onClose }: CartErrorAlertProps) {
  return (
    <AlertDialog open={!!errorMessage} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-3xl border-2 border-slate-100 shadow-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black uppercase tracking-tight text-red-600 italic">
            {title || "Attention"} 
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600 font-medium text-base leading-relaxed">
            {errorMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogAction 
            onClick={onClose}
            className="bg-black hover:bg-slate-800 text-white rounded-2xl h-12 px-10 font-bold transition-all active:scale-95"
          >
            UNDERSTOOD
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}