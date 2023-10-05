import React, {useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import actionTypes from '../redux/constant';

import IconBack from '../assets/back.png';
import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';

function PostDetailScreen(props) {
  const params = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.reducer.posts);
  const [newComment, setNewComment] = useState(null);

  const postIndex = posts.findIndex(post => post.id === params.post_id);
  const post = posts[postIndex];

  const onUpVote = id => dispatch({type: actionTypes.SET_UP_VOTES, value: id});
  const onDownVote = id =>
    dispatch({type: actionTypes.SET_DOWN_VOTES, value: id});
  const onAddComment = () => {
    if (newComment === null || newComment === '') return;
    dispatch({
      type: actionTypes.ADD_COMMENT,
      value: {
        post_id: post.id,
        comment: {author: 'Unknown', comment: newComment},
      },
    });
    setNewComment(null);
  };

  return (
    <SafeAreaView>
      <ScrollView style={{marginBottom: 48}}>
        <View>
          <View
            style={{
              height: 64,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Image
                source={IconBack}
                height={18}
                width={18}
                style={{marginLeft: 22}}
              />
            </Pressable>
            <Image
              source={{
                uri: 'https://picsum.photos/200',
              }}
              width={48}
              height={48}
              style={{borderRadius: 24, marginLeft: 24}}
            />
            <View style={{marginLeft: 16}}>
              <Text
                style={{fontWeight: '600', fontSize: 14, lineHeight: 16.94}}>
                {post.author}
              </Text>
              <Text style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
                {post.date}
              </Text>
            </View>
          </View>
          <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
          <View>
            <Text style={{margin: 24}}>{post.post}</Text>
            <Image
              source={{
                uri: post.image_url,
              }}
              height={200}
            />
          </View>
          <View
            style={{
              height: 52,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image
                source={IconShare}
                height={18}
                width={18}
                style={{marginLeft: 22}}
              />
              <Image
                source={IconComment}
                height={18}
                width={18}
                style={{marginLeft: 24}}
              />
              <Text
                style={{
                  width: 24,
                  marginHorizontal: 4,
                  textAlign: 'center',
                }}>
                {post.comments.length}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={IconBlock}
                height={18}
                width={18}
                style={{marginLeft: 22}}
              />
              <Pressable onPress={() => onDownVote(post.id)}>
                <Image
                  source={IconDownvoteInactive}
                  height={18}
                  width={18}
                  style={{marginLeft: 24}}
                />
              </Pressable>
              <Text
                style={{
                  width: 24,
                  marginHorizontal: 11,
                  textAlign: 'center',
                }}>
                {post.upVotes - post.downVotes}
              </Text>
              <Pressable onPress={() => onUpVote(post.id)}>
                <Image
                  source={IconUpvoteInactive}
                  height={18}
                  width={18}
                  style={{marginRight: 22}}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={{height: 4, backgroundColor: '#C4C4C4'}} />
        {post.comments.map((comment, index) => (
          <View key={index}>
            <View
              style={{
                flexDirection: 'row',
                minHeight: 72,
                paddingVertical: 16,
                paddingHorizontal: 24,
              }}>
              <Image
                source={{
                  uri: 'https://picsum.photos/200',
                }}
                width={36}
                height={36}
                style={{borderRadius: 24, marginRight: 16}}
              />
              <View style={{width: '90%'}}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 12,
                    lineHeight: 14.52,
                    color: '#828282',
                  }}>
                  {comment.author}
                </Text>
                <Text
                  style={{fontWeight: '400', fontSize: 16, lineHeight: 19.36}}>
                  {comment.comment}
                </Text>
              </View>
            </View>
            {post.comments.length - 1 !== index && (
              <View style={{height: 1, backgroundColor: '#C4C4C4'}} />
            )}
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: 24,
          zIndex: 10,
        }}>
        <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
        <TextInput
          placeholder="Enter Comment"
          value={newComment}
          onChangeText={e => setNewComment(e)}
          style={{flex: 1}}
        />
        <Button title="Comment" onPress={onAddComment} />
      </View>
    </SafeAreaView>
  );
}

export default PostDetailScreen;
