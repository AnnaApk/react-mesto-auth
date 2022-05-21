import {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePoup';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [currentUser, setCurrentUser] = useState({name: '' , about: '' , avatar: '', _id: ''});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInitialCards()
    .then(res => {
      setCards(res);
    })
    .catch((err) => {
      console.log(err);
    });
    api.getUserInfo()
    .then((res) => {
      setCurrentUser(prevState => ({ ...prevState, name: res.name, about: res.about, avatar: res.avatar, _id: res._id }));
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  // useEffect(() => {
  //   api.getUserInfo()
  //   .then((res) => {
  //     setCurrentUser(prevState => ({ ...prevState, name: res.name, about: res.about, avatar: res.avatar, _id: res._id }));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   }) 
  // }, [])

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((prevCards) => prevCards.map((prevCard) => prevCard._id === card._id ? newCard : prevCard));
    })
    .catch((err) => {
      console.log(err);
    });
  }

 const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      setCards((prevCards) => prevCards.filter((prevCard) => prevCard._id === card._id ? '' : prevCard));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  const handleUpdateUser = ({name, about}) => {
    api.editProfile(name, about)
    .then((res) => {
      setCurrentUser(prevState => ({ ...prevState, name: res.name, about: res.about }));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  const handleUpdateAvatar = ({avatar}) => {
    api.editAvatar(avatar)
    .then((res) => {
      setCurrentUser(prevState => ({ ...prevState, avatar: res.avatar }));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  const handleAddPlace = ({name, link}) => {
    api.addNewCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }) 
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />
        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />

        <PopupWithForm name="delete-post" title="Вы уверены?">
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
