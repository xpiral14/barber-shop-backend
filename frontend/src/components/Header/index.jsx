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
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.user);
  return (
    <HeaderElement>
      <InfoContent>
        <UserContent>
          <p>{user.name}</p>
          <small>{user.userTypeId}</small>
        </UserContent>
        <ImageContent>
          <img src="https://i.pravatar.cc/40" />
        </ImageContent>
      </InfoContent>
    </HeaderElement>
  );
}
