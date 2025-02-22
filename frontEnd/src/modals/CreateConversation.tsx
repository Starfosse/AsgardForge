import { NewConversation } from "@/pages/client/Contact";

interface CreateConversationProps {
  newConversation: NewConversation;
  setNewConversation: (newConversation: NewConversation) => void;
  setIsCreateModalOpen: (isOpen: boolean) => void;
  handleCreateConversation: () => void;
}

export default function CreateConversation({
  newConversation,
  setNewConversation,
  setIsCreateModalOpen,
  handleCreateConversation,
}: CreateConversationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-stone-800 mb-4">
          Nouvelle Conversation
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Sujet
            </label>
            <input
              type="text"
              value={newConversation.subject}
              onChange={(e) =>
                setNewConversation({
                  ...newConversation,
                  subject: e.target.value,
                })
              }
              className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ex: Question sur une commande"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Numéro de commande (optionnel)
            </label>
            <input
              type="text"
              value={newConversation.orderId}
              onChange={(e) =>
                setNewConversation({
                  ...newConversation,
                  orderId: e.target.value,
                })
              }
              className="w-full p-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Ex: CMD-2024-XXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Message initial
            </label>
            <textarea
              value={newConversation.initialMessage}
              onChange={(e) =>
                setNewConversation({
                  ...newConversation,
                  initialMessage: e.target.value,
                })
              }
              className="w-full p-2 border border-stone-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-500"
              rows={4}
              placeholder="Votre message..."
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleCreateConversation}
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-600 transition-colors"
              disabled={
                !newConversation.subject || !newConversation.initialMessage
              }
            >
              Créer la conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
