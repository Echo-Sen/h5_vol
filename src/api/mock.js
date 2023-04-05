import Mock from 'mockjs'
import Swipe from './mockServeData/swipe'
import Community from './mockServeData/community'
Mock.mock('/api/swipe', 'get', Swipe.getSwipeData)
Mock.mock('/api/community', 'get', Community.getCommunityData)