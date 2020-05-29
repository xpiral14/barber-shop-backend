import React from "react";
import {
  Header as HeaderElement,
  UserContent,
  ImageContent,
  InfoContent,
} from "./style";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  fetchUserTokenSucces,
  fetchUserToken,
} from "../../store/modules/auth/actions";
import { toast } from "react-toastify";
import Input from "../Input";
export default function Header() {
  const dispatch = useDispatch();

  return (
    <HeaderElement>
      <InfoContent>
        <UserContent>
          <p>Samuel Reis</p>
          <small>Barbeiro</small>
        </UserContent>
        <ImageContent>
          <img src="https://i.pravatar.cc/40" />
        </ImageContent>
      </InfoContent>
    </HeaderElement>
  );
}
