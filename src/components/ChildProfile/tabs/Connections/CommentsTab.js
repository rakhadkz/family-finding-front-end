import Comment, { CommentAuthor, CommentTime } from '@atlaskit/comment';
import { useContext } from 'react';
import { Avatar } from '../../../ui/molecules/Avatar';
import { ConnectionContext } from './ConnectionModal';
import moment from "moment";
import { humanReadableDateFormat } from '../../../../content/date';
import { useHistory } from 'react-router-dom';

export const CommentsTab = () => {
  const { commentState: { comments } } = useContext(ConnectionContext)
  const history = useHistory();
  return (
    <div style={{ marginTop: "30px" }}>
      {
        comments.map(item => item && item.comment && (
          <div style={{ cursor: "pointer" }} onClick={() => history.go('#comments')}>
            <Comment
              avatar={<Avatar name={`${item.comment.user.first_name} ${item.comment.user.last_name}`}/>}
              author={<CommentAuthor href="/author">{item.comment.user.first_name} {item.comment.user.last_name}</CommentAuthor>}
              content={item.comment.body}
              time={<CommentTime>{moment(item.created_at).format(humanReadableDateFormat)}</CommentTime>}
            />
          </div>
        ))
      }
    </div>
  )
}