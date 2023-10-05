import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import IconBlock from '../assets/block.png';
import IconComment from '../assets/comment.png';
import IconDownvoteInactive from '../assets/downvote_inactive.png';
import IconShare from '../assets/share.png';
import IconUpvoteInactive from '../assets/upvote_inactive.png';

import actionTypes from '../redux/constant';

function FeedScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.reducer.posts);

  const onUpVote = id => dispatch({type: actionTypes.SET_UP_VOTES, value: id});
  const onDownVote = id =>
    dispatch({type: actionTypes.SET_DOWN_VOTES, value: id});

  return (
    <SafeAreaView>
      <FlatList
        data={posts}
        extraData={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('post-detail', {post_id: item.id})
            }>
            <View>
              <View
                style={{
                  height: 64,
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
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
                    style={{
                      fontWeight: '600',
                      fontSize: 14,
                      lineHeight: 16.94,
                    }}>
                    {item.author}
                  </Text>
                  <Text
                    style={{fontWeight: '400', fontSize: 12, lineHeight: 18}}>
                    {item.date}
                  </Text>
                </View>
              </View>
              <View style={{height: 0.5, backgroundColor: '#C4C4C4'}} />
              <View>
                <Text numberOfLines={3} style={{margin: 24}}>
                  {item.post}
                </Text>
                <Image
                  source={{
                    uri: item.image_url,
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
                    {item.comments.length}
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
                  <Pressable onPress={() => onDownVote(item.id)}>
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
                    {item.upVotes - item.downVotes}
                  </Text>
                  <Pressable onPress={() => onUpVote(item.id)}>
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
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

export default FeedScreen;
