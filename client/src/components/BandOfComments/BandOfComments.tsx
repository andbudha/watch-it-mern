import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './BandOfComments.module.scss';
import { Commentary } from './Commentary/Commentary';
import { CommentaryForm } from './CommentaryForm/CommentaryForm';
import { DataContext } from '../../context/DataContext';

type BandOfCommentsProps = {
  movieID: string | undefined;
};
export const BandOfComments = ({ movieID }: BandOfCommentsProps) => {
  const { user } = useContext(AuthContext);
  const { commentaries } = useContext(DataContext);

  const filteredComments = commentaries
    ?.filter((commentary) => commentary.movieID === movieID)
    .sort((a, b) => (a.timestamp < b.timestamp ? -1 : 1));
  const listOfCommentaries = filteredComments?.map((commentary) => (
    <Commentary key={commentary.id} commentary={commentary} />
  ));
  return (
    <div className={styles.comment_band_main_box}>
      <div className={styles.underline}></div>
      {!user ? (
        <h2 className={styles.section_title}>
          Log in to leave commentaries and save favourite movies!
        </h2>
      ) : (
        <h2 className={styles.section_title}>Share your thaughts:</h2>
      )}
      <div className={styles.underline}></div>
      {listOfCommentaries}
      {!!user && <CommentaryForm />}
    </div>
  );
};
