export default function DeleteModalConfirm({ onClose, onConfirm, deleting }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="rounded-xl bg-slate-800 p-6">
        <h2 className="text-xl font-bold">Delete Task?</h2>

        <p className="mt-2 text-slate-400">This action cannot be undone.</p>

        <div className="mt-6 flex justify-end gap-3">
          <button disabled={deleting} onClick={onClose}>
            Cancel
          </button>

          <button disabled={deleting} onClick={onConfirm}>
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
