import { ReactNode } from "react";

interface BottomSheetProps {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
}

const BottomSheet = ({ open, onClose, children }: BottomSheetProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/35" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
        <div className="w-full max-w-[420px] bg-white rounded-t-3xl shadow-2xl p-6 pb-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
