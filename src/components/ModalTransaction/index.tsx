import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import * as zod from "zod";
import * as Styles from "./styles";
import { useContextSelector } from "use-context-selector";

const newTransactionSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(["income", "outcome"]),
});

type NewTransactionFormInputs = zod.infer<typeof newTransactionSchema>;

const ModalTransaction = () => {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const { control, register, reset, handleSubmit } =
    useForm<NewTransactionFormInputs>({
      resolver: zodResolver(newTransactionSchema),
    });

  const handleCreateNewTransaction = async (data: NewTransactionFormInputs) => {
    const { description, price, category, type } = data;

    await createTransaction({
      description,
      price,
      category,
      type,
    });

    reset();
  };

  return (
    <Dialog.Portal>
      <Styles.Overlay />
      <Styles.Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <Styles.CloseButton>
          <X size={22} />
        </Styles.CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <Styles.TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <Styles.TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </Styles.TransactionTypeButton>
                  <Styles.TransactionTypeButton
                    variant="outcome"
                    value="outcome"
                  >
                    <ArrowCircleDown size={24} />
                    Saída
                  </Styles.TransactionTypeButton>
                </Styles.TransactionType>
              );
            }}
          />
          <button type="submit">Cadastrar</button>
        </form>
      </Styles.Content>
    </Dialog.Portal>
  );
};

export default ModalTransaction;
