import InputAdd from "../atoms/InputAdd";
import PostCard from "../molecules/PostCard";
import {useAddPostMutation, useGetPostsQuery} from "../../store/rtk/posts";

interface Props {
  onSelect: (arg0: string) => void
}

const Posts = (props: Props) => {
  const {data,isLoading} = useGetPostsQuery(null);
  const [addPost] = useAddPostMutation();

  return (
    <div className={"flex flex-col gap-y-4"}>
      { localStorage.getItem('access_token') &&
        <InputAdd onSubmit={(e: string) => { addPost({title: e}) }} placeholder={'Créer un nouveau post'} />
      }
      { !isLoading && data.map((post: any) =>
        <div key={post._id}>
          <PostCard onSelect={(id: any) => props.onSelect(id)} name={post.title} description={post.text} id={post._id} messages={20}/>
        </div>
      )}
    </div>
  )
}

export default Posts