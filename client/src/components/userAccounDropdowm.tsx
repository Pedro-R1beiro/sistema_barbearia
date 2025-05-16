import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function userAccounDropdowm() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <FontAwesomeIcon icon={faUser} />
          <span>UserName</span>
        </DropdownMenuTrigger>
      </DropdownMenu>
    </>
  );
}
