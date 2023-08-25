import * as Dialog from "@radix-ui/react-dialog";
import * as Styles from "./styles";
import logo from "../../assets/logo.svg";
import ModalTransaction from "../ModalTransaction";

const Header = () => {
  return (
    <Styles.Container>
      <Styles.Content>
        <Styles.Image src={logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Styles.Button>Nova transação</Styles.Button>
          </Dialog.Trigger>
          <ModalTransaction />
        </Dialog.Root>
      </Styles.Content>
    </Styles.Container>
  );
};

export default Header;
