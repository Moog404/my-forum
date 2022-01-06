import InputAdd from "../atoms/InputAdd";
import CommentCard from "../organisms/CommentCard";
import {useAddCommentMutation, useGetCommentsQuery} from "../../store/rtk/comments";
import {createRef} from "react";

interface Props {
  id: string | null
}

const Comments = (props: Props) => {

  const {data, isLoading} = useGetCommentsQuery(null);
  const [addComment] = useAddCommentMutation();

  const commentWrapper: any = createRef();

  return (
    <div className={"flex flex-col gap-y-8 h-full"}>
        <div ref={commentWrapper} className={"flex flex-1 flex-col gap-y-4 overflow-y-auto"}>
          {
            !isLoading && data.map((comment: any) => props.id && comment.post === props.id &&
            <CommentCard key={comment._id} content={
              comment.text
            }/>
          )}
        </div>
        {props.id && localStorage.getItem('access_token') &&
          <InputAdd onSubmit={(e: any) => { addComment({text: e, post: props.id}) }} placeholder={'Ajouter un nouveau commentaire'} />
        }
    </div>
  )
}

export default Comments;