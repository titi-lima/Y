import * as Dialog from "../dialog";
import * as Textarea from "../textarea";
import * as Button from "../button";
import * as Input from "../input";
import React from "react";
import { api } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useToast } from "../use-toast";

export const PostModal = ({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [body, setBody] = React.useState({
    text: "",
    midiaLink: "",
  });
  return (
    <Dialog.Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>Nova Publicação</Dialog.DialogTitle>
          <Dialog.DialogClose />
        </Dialog.DialogHeader>
        <Dialog.DialogDescription>
          <div className="flex flex-1 gap-1 flex-col">
            <Textarea.Textarea
              placeholder="Escreva algo..."
              value={body.text}
              onChange={(e) => setBody({ ...body, text: e.target.value })}
            />
            <Input.Input
              type="file"
              className="invisible w-0 h-0"
              ref={fileRef}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append("file", file);
                  const res = api.post("/files/upload", formData);
                  setBody({ ...body, midiaLink: (await res).data.data.url });
                }
              }}
            />
            <Button.Button
              className="w-full"
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              Adicionar Imagem
            </Button.Button>
          </div>
        </Dialog.DialogDescription>
        <Dialog.DialogFooter>
          <Button.Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button.Button>
          <Button.Button
            onClick={async () => {
              try {
                await api.post("/posts", {
                  ...body,
                  authorId: session?.user.id,
                });
                toast({
                  description: "Post publicado com sucesso!",
                  variant: "default",
                });
              } catch (error) {
                toast({
                  description: "Erro ao publicar post",
                  variant: "destructive",
                });
              }
            }}
          >
            Publicar
          </Button.Button>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
