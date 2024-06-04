import React, { useState } from 'react'
import styles from './Discussion.module.css'
import { Comment } from '../../../../../../../components/ModuleComponent/Comment'
import { CommentInput } from '../../../../../../../components/ModuleComponent/CommentInput'
import { CommentProps } from '../../../../../../../components/ModuleComponent/Comment/Comment'

const dummyComments = [
  {
    "id": 1,
    "content": "Lorem ipsum dolor sit amet consectetur. Amet nulla auctor semper a varius. Aenean blandit lectus arcu faucibus. Convallis tortor nullam tincidunt turpis accumsan. In risus ac ullamcorper cum ornare volutpat sed..",
    "likeCount": 235,
    "createdAt": "2024-01-24",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 1,
    "user_id": "ecf4991e-7ba8-4d1d-a297-736d13b089ca",
    "replyData": [
      {
        "id": 101,
        "content": "Reply to comment 1",
        "likeCount": 50,
        "createdAt": "2024-01-24",
        "updatedAt": null,
        "deletedAt": null,
        "quest_id": 1,
        "user_id": "d77bd61c-6e58-46c0-b693-6e59b7d7f590"
      },
      {
        "id": 102,
        "content": "Another reply to comment 1",
        "likeCount": 20,
        "createdAt": "2024-01-25",
        "updatedAt": null,
        "deletedAt": null,
        "quest_id": 1,
        "user_id": "04bcd54a-0282-42d7-823e-1df544f48d51"
      }
    ]
  },
  {
    "id": 2,
    "content": "Another comment example.",
    "likeCount": 150,
    "createdAt": "2024-01-25",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 2,
    "user_id": "04bcd54a-0282-42d7-823e-1df544f48d51",
    "replyData": []
  },
  {
    "id": 3,
    "content": "Third comment with some replies.",
    "likeCount": 120,
    "createdAt": "2024-01-26",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 3,
    "user_id": "a148e3a5-9519-469e-8746-241171be1a8e",
    "replyData": [
      {
        "id": 103,
        "content": "Reply to comment 3",
        "likeCount": 30,
        "createdAt": "2024-01-27",
        "updatedAt": null,
        "deletedAt": null,
        "quest_id": 3,
        "user_id": "4f5a8058-7b09-470c-9e95-1215291b8e13"
      }
    ]
  },
  {
    "id": 4,
    "content": "Fourth comment example.",
    "likeCount": 80,
    "createdAt": "2024-01-28",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 4,
    "user_id": "173cf32b-b49c-49d8-975e-9e44842c99cd",
    "replyData": []
  },
  {
    "id": 5,
    "content": "Fifth comment without replies.",
    "likeCount": 95,
    "createdAt": "2024-01-29",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 5,
    "user_id": "72d2d546-c60f-400f-ad7f-2215c98d8bee",
    "replyData": []
  },
  {
    "id": 6,
    "content": "Sixth comment example.",
    "likeCount": 110,
    "createdAt": "2024-01-30",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 6,
    "user_id": "b87655ec-d185-4961-a390-9be296c3c88e",
    "replyData": []
  },
  {
    "id": 7,
    "content": "Seventh comment with replies.",
    "likeCount": 130,
    "createdAt": "2024-01-31",
    "updatedAt": null,
    "deletedAt": null,
    "quest_id": 7,
    "user_id": "eea90068-2c8a-4ea5-9324-c6778faa98d1",
    "replyData": [
      {
        "id": 104,
        "content": "Reply to comment 7",
        "likeCount": 40,
        "createdAt": "2024-02-01",
        "updatedAt": null,
        "deletedAt": null,
        "quest_id": 7,
        "user_id": "0dc3263c-d54f-4942-9af8-07fcc5fb37bc"
      },
      {
        "id": 105,
        "content": "Another reply to comment 7",
        "likeCount": 25,
        "createdAt": "2024-02-02",
        "updatedAt": null,
        "deletedAt": null,
        "quest_id": 7,
        "user_id": "ecf4991e-7ba8-4d1d-a297-736d13b089ca"
      }
    ]
  }
]

const dummyUserData = [
  {
    "id": "ecf4991e-7ba8-4d1d-a297-736d13b089ca",
    "email": "dmunoz@hotmail.com",
    "password": "QRF1Xku%#M",
    "name": "Marvin Kidd",
    "nickname": "ricediana",
    "phoneNumber": "575-369-6607x2789",
    "language": "lb",
    "country": "Vanuatu",
    "profileImage": "../../../../../../../assets/images/character/character01.webp",
    "bio": "Kid worker go off. Show cold dinner let public...",
    "role": "user",
    "level": 65,
    "exp": 4175,
    "point": 881,
    "cash": 318,
    "isPublic": true,
    "createdAt": "2020-10-18T05:10:22",
    "updatedAt": "2023-11-22T03:34:04",
    "deletedAt": null
  },
  {
    "id": "d77bd61c-6e58-46c0-b693-6e59b7d7f590",
    "email": "wilsontyler@yahoo.com",
    "password": "R#7S#MmF#c",
    "name": "Justin Robertson",
    "nickname": "ruizbreanna",
    "phoneNumber": "(266)614-5356x882",
    "language": "pt",
    "country": "Belgium",
    "profileImage": "https://github.com/fornerds/fornerds/blob/b5f990e5b05ad1669a592c3f4d65cbeada128687/frontend/src/assets/images/character/character01.webp",
    "bio": "Action campaign board. Standard close magazine...",
    "role": "moderator",
    "level": 37,
    "exp": 5556,
    "point": 60,
    "cash": 65,
    "isPublic": false,
    "createdAt": "2020-04-12T06:40:53",
    "updatedAt": "2022-01-20T04:03:07",
    "deletedAt": "2020-02-16T17:28:38"
  },
  {
    "id": "04bcd54a-0282-42d7-823e-1df544f48d51",
    "email": "carlosroberts@gmail.com",
    "password": "&GfD2Iya@f",
    "name": "Kevin Koch",
    "nickname": "william43",
    "phoneNumber": "(840)095-3217x9914",
    "language": "nhn",
    "country": "Greenland",
    "profileImage": "https://github.com/fornerds/fornerds/blob/b5f990e5b05ad1669a592c3f4d65cbeada128687/frontend/src/assets/images/character/character01.webp",
    "bio": "For edge cut great car. Professor raise people...",
    "role": "moderator",
    "level": 93,
    "exp": 5649,
    "point": 288,
    "cash": 393,
    "isPublic": true,
    "createdAt": "2023-07-06T17:36:59",
    "updatedAt": "2021-02-09T16:11:42",
    "deletedAt": "2021-06-13T15:46:41"
  },
  {
    "id": "a148e3a5-9519-469e-8746-241171be1a8e",
    "email": "andrewryan@yahoo.com",
    "password": "1KFu%T+t^v",
    "name": "Tyler Davidson",
    "nickname": "hadams",
    "phoneNumber": "558.392.3103",
    "language": "pl",
    "country": "Lithuania",
    "profileImage": "https://placekitten.com/528/595",
    "bio": "Film generation town purpose interview already...",
    "role": "admin",
    "level": 31,
    "exp": 2031,
    "point": 936,
    "cash": 461,
    "isPublic": true,
    "createdAt": "2020-03-04T04:15:13",
    "updatedAt": "2020-08-21T19:34:37",
    "deletedAt": "2020-10-23T10:16:54"
  },
  {
    "id": "4f5a8058-7b09-470c-9e95-1215291b8e13",
    "email": "stephen08@webb.net",
    "password": "@1HRPKzf^H",
    "name": "Abigail Snyder",
    "nickname": "sarahcaldwell",
    "phoneNumber": "513-556-9373x90083",
    "language": "hak",
    "country": "Syrian Arab Republic",
    "profileImage": "https://www.lorempixel.com/223/184",
    "bio": "Some laugh radio usually understand sense posi...",
    "role": "moderator",
    "level": 9,
    "exp": 4759,
    "point": 114,
    "cash": 146,
    "isPublic": false,
    "createdAt": "2024-04-02T12:25:39",
    "updatedAt": "2021-07-26T20:37:40",
    "deletedAt": "2023-11-28T10:08:49"
  },
  {
    "id": "173cf32b-b49c-49d8-975e-9e44842c99cd",
    "email": "tina84@mckenzie-watson.com",
    "password": ")G2tZTAw33",
    "name": "Terry Morris",
    "nickname": "hughesmelissa",
    "phoneNumber": "001-267-185-3228x5552",
    "language": "ms",
    "country": "Portugal",
    "profileImage": "https://placekitten.com/424/628",
    "bio": "International necessary traditional deal many...",
    "role": "admin",
    "level": 9,
    "exp": 3429,
    "point": 101,
    "cash": 165,
    "isPublic": true,
    "createdAt": "2020-07-18T23:22:36",
    "updatedAt": "2022-09-02T08:30:41",
    "deletedAt": null
  },
  {
    "id": "72d2d546-c60f-400f-ad7f-2215c98d8bee",
    "email": "xlang@rios-gallagher.com",
    "password": "^thHUzZSK0",
    "name": "Whitney Hill",
    "nickname": "space",
    "phoneNumber": "(900)597-0230",
    "language": "ky",
    "country": "Bahrain",
    "profileImage": "https://placeimg.com/196/859/any",
    "bio": "Scene its tonight try able focus. Describe sub...",
    "role": "moderator",
    "level": 87,
    "exp": 5746,
    "point": 79,
    "cash": 435,
    "isPublic": false,
    "createdAt": "2023-12-08T01:48:09",
    "updatedAt": "2023-06-24T05:27:22",
    "deletedAt": "2023-05-07T12:19:03"
  },
  {
    "id": "b87655ec-d185-4961-a390-9be296c3c88e",
    "email": "john03@cook.net",
    "password": "PY*BpcIg_1",
    "name": "Jane Walker",
    "nickname": "justin72",
    "phoneNumber": "001-499-717-0074",
    "language": "ps",
    "country": "New Caledonia",
    "profileImage": "https://www.lorempixel.com/477/103",
    "bio": "Walk provide age then send traditional however...",
    "role": "moderator",
    "level": 92,
    "exp": 2799,
    "point": 658,
    "cash": 13,
    "isPublic": true,
    "createdAt": "2020-04-14T23:37:45",
    "updatedAt": "2020-10-31T00:39:49",
    "deletedAt": null
  }]

export function Discussion() {
  const [commentData, setCommentData] = useState<CommentProps[]>(dummyComments)
  const updateComment = (updatedComment: CommentProps) => {
    const updatedComments = commentData.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setCommentData(updatedComments);
  };

  const deleteComment = (commentId: number) => {
    const updatedComments = commentData.filter((comment) => comment.id !== commentId);
    setCommentData(updatedComments);
  };

  const submitComment = () => {
    console.log("댓글을 달았다")
  }

  // Like 숫자가 가장 많은 2개의 Comments 추출
  const popularComments = commentData.sort((a, b) => b.likeCount - a.likeCount).slice(0, 3)

  return (
    <div className={styles.contents_box}>
      <div className={styles.left_box}>
        <div className={styles.discussion_box}>
          <CommentInput buttonText="Submit" onSubmit={submitComment}/>
          <div className={styles.comments}>
            {commentData.map((commentData) => (
              <Comment
                key={commentData.id}
                commentData={commentData}
                updateComment={updateComment}
                deleteComment={deleteComment}
                currentUser={dummyUserData[0]} />
            ))}
          </div>
          <div className={styles.load_more}></div>
        </div>
      </div>
      <div className={styles.right_box}>
        <div className={styles.popular_discussion}>
          <p>Popular discussion</p> </div>
        <div className={styles.popularCommentsList}>
          {popularComments.map((commentData) => (
            <Comment
              key={commentData.id}
              commentData={commentData}
              updateComment={updateComment}
              deleteComment={deleteComment}
              currentUser={dummyUserData[0]} />
          ))}
        </div>
      </div>
    </div>
  )
}
