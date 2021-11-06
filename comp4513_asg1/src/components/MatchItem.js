import React from 'react';
import FavoritesContext from './FavoritesContextProvider.js';

function MatchItem(props) {
  const {favorites, addFavorite, isFavorite} = FavoritesContext(FavoritesContext);
  
  
  if (isFavorite(props.play.id) {
    
  
  return (
    <tr>
      <td>{props.play.title}</td>
      <td>{props.play.genre}</td>
      <td>{props.play.likelyDate}</td>
      <td></td>
      <td></td>
    </tr>
  );
}

export default MatchItem;



/*
{
     "id": "alls_well_that_ends_well", 
     "filename": "",
     "title": "All's Well That Ends Well",
     "likelyDate": "1600",
	 "genre" : "comedy",
     "wiki": "https://en.wikipedia.org/wiki/All%27s_Well_That_Ends_Well",
     "gutenberg": "https://gutenberg.org/ebooks/1529",
	 "shakespeareOrg" : "https://www.shakespeare.org.uk/explore-shakespeare/shakespedia/shakespeares-plays/alls-well-ends-well/",
	 "synopsis": "Helen saves the King's life, he gives her his son to marry, who runs away from her, and she tricks him into impregnating her. Everything ends happily.",
      "desc" : "Bertram is compelled to marry Helena. Bertram refuses to consummate their marriage. He goes to Italy. In Italy he courts Diana. Helena meets Diana. They perform the bed trick. The play is considered one of Shakespeare's problem plays, a play that poses complex ethical dilemmas that require more than typically simple solutions."

   }, 
*/
