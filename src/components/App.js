import { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import PersonalPage from "./PersonalPage";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorize, getContent } from "../utils/auth";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [infoTooltipState, setInfoTooltipState] = useState({
    status: "",
    text: "",
    isOpen: false,
  });
  const messageErr = "Что-то пошло не так! Попробуйте ещё раз.";
  const messageSucc = "Вы успешно зарегистрировались!";
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const closeInfoTooltip = () => {
    if (infoTooltipState.status == "success") {
      history.push("/sign-in");
    }
    setInfoTooltipState((prevState) => ({
      ...prevState,
      isOpen: false,
      text: "",
      status: "",
    }));
  };

  const handleRegister = ({ email, password }) => {
    return register(email, password)
      .then((res) => {
        let data = res.data;
        return data;
      })
      .then((data) => {
        if (data && data.email && data._id) {
          setInfoTooltipState((prevState) => ({
            ...prevState,
            isOpen: true,
            text: messageSucc,
            status: "success",
          }));
        }
      })
      .catch(() => {
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: "bad",
        }));
      });
  };

  const handleLogin = ({ email, password }) => {
    return authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
        }
      })
      .catch(() => {
        setInfoTooltipState((prevState) => ({
          ...prevState,
          isOpen: true,
          text: messageErr,
          status: "bad",
        }));
      });
  };

  const tokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      getContent(jwt).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
      });
    }
  };

  const signOut = () => {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res[0].name,
          about: res[0].about,
          avatar: res[0].avatar,
          _id: res[0]._id,
        }));
        setCards(res[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) =>
          prevCards.map((prevCard) =>
            prevCard._id === card._id ? newCard : prevCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) =>
          prevCards.filter((prevCard) =>
            prevCard._id === card._id ? "" : prevCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser((prevState) => ({
          ...prevState,
          name: res.name,
          about: res.about,
        }));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editAvatar(avatar)
      .then((res) => {
        setCurrentUser((prevState) => ({ ...prevState, avatar: res.avatar }));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlace = ({ name, link }) => {
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          signOut={signOut}
          userEmail={userEmail}
          handleEditAvatarClick={handleEditAvatarClick}
          handleEditProfileClick={handleEditProfileClick}
          handleAddPlaceClick={handleAddPlaceClick}
          handleCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleCardDelete={handleCardDelete}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          handleUpdateUser={handleUpdateUser}
          handleUpdateAvatar={handleUpdateAvatar}
          handleAddPlace={handleAddPlace}
          closeAllPopups={closeAllPopups}
          selectedCard={selectedCard}
          component={PersonalPage}
        />

        <Route path="/sign-up">
          <Register handleRegister={handleRegister} />
          <InfoTooltip state={infoTooltipState} onClose={closeInfoTooltip} />
        </Route>
        <Route path="/sign-in">
          <Login handleLogin={handleLogin} />
          <InfoTooltip state={infoTooltipState} onClose={closeInfoTooltip} />
        </Route>

        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
