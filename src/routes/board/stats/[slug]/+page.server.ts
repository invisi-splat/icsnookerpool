import { supabase } from "$lib/supabaseClient";
import type { PageServerLoad } from "../../$types";

export const load: PageServerLoad = async ({ params }) => {
  /*
  const breakInfo = await supabase
    .from("breaks")
    .select()
    //@ts-expect-error slug is broken?
    .eq("player", params.slug)
  
  if (breakInfo.error) throw breakInfo.error;
*/
  const breakInfo: { data: DbBreakInfo } = {
    data: [
      {
        id: 166,
        submitted: '2024-05-28T23:25:48.229+00:00',
        break: 55,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 103,
        submitted: '2024-03-17T12:45:14.823+00:00',
        break: 45,
        verified: true,
        location: 'at Woking',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 60,
        submitted: '2024-03-03T20:45:10+00:00',
        break: 42,
        verified: true,
        location: 'at Hurricane',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 61,
        submitted: '2024-03-03T20:45:22+00:00',
        break: 35,
        verified: true,
        location: 'at Hurricane',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 91,
        submitted: '2024-03-08T11:39:21.453+00:00',
        break: 69,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 57,
        submitted: '2024-02-10T18:24:04+00:00',
        break: 79,
        verified: true,
        location: 'at Tamworth',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 167,
        submitted: '2024-05-29T00:28:18.295+00:00',
        break: 33,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 121,
        submitted: '2024-05-07T17:49:06.866+00:00',
        break: 47,
        verified: true,
        location: 'on Table 2',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 142,
        submitted: '2024-05-11T11:21:21.239+00:00',
        break: 77,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 143,
        submitted: '2024-05-11T11:21:25.908+00:00',
        break: 49,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 123,
        submitted: '2024-05-07T19:29:22.221+00:00',
        break: 44,
        verified: true,
        location: 'on Table 2',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 151,
        submitted: '2024-05-19T17:58:34.217+00:00',
        break: 32,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 153,
        submitted: '2024-05-19T17:58:52.586+00:00',
        break: 43,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 154,
        submitted: '2024-05-19T19:05:57.894+00:00',
        break: 39,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 183,
        submitted: '2024-06-14T15:57:31.484+00:00',
        break: 63,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 184,
        submitted: '2024-06-14T15:57:37.563+00:00',
        break: 40,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 186,
        submitted: '2024-06-14T18:20:49.745+00:00',
        break: 92,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 185,
        submitted: '2024-06-14T15:57:44.856+00:00',
        break: 40,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 233,
        submitted: '2024-10-11T18:30:38.267+00:00',
        break: 61,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 234,
        submitted: '2024-10-11T19:35:40.196+00:00',
        break: 30,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 236,
        submitted: '2024-10-12T21:05:30.215+00:00',
        break: 44,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 273,
        submitted: '2024-11-29T22:02:00.727+00:00',
        break: 88,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 274,
        submitted: '2024-11-29T23:08:27.391+00:00',
        break: 50,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 275,
        submitted: '2024-11-29T23:12:34.313+00:00',
        break: 48,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 276,
        submitted: '2024-11-29T23:12:39.807+00:00',
        break: 39,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: false
      },
      {
        id: 281,
        submitted: '2024-12-04T15:04:28.831+00:00',
        break: 50,
        verified: true,
        location: 'at Shootout',
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 282,
        submitted: '2024-12-04T15:08:11.855+00:00',
        break: 25,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 304,
        submitted: '2025-01-19T18:05:36.834+00:00',
        break: 48,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      },
      {
        id: 305,
        submitted: '2025-01-19T18:05:46.831+00:00',
        break: 44,
        verified: true,
        location: null,
        balls_potted: null,
        reactions: null,
        player: 'a8d9c209-3ac9-4ef3-81a7-ce5a8958952d',
        opponent: null,
        is_best: true
      }
    ]
  }
  return { breakInfo: breakInfo.data, name: "Om Goswamy" }
}