export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center space-y-4 max-w-sm mx-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-900">Analysiere Kommentar...</h3>
          <p className="text-sm text-gray-600">KI verarbeitet den Inhalt</p>
        </div>
      </div>
    </div>
  );
}
