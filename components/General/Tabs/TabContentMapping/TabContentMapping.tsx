// components/TabContentMapping.tsx
import React, { FC } from 'react';
import HomePage from '../../../../pages/home'; 
import ChatsPage from '../../../../pages/chats'; 
import CallsPage from '../../../../pages/calls'; 
import CalendarPage from '../../../../pages/calendar'; 
import CloudPage from '../../../../pages/cloud';
import CommunityPage from '../../../../pages/community';
import VideosPage from '../../../../pages/videos';
import TvPage from '../../../../pages/tv';
import BankPage from '../../../../pages/bank';

const TabContentMapping: Record<string, FC<any>> = {
  home: HomePage,
  chats: ChatsPage,
  calls: CallsPage,
  calendar: CalendarPage,
  cloud: CloudPage,
  community: CommunityPage,
  videos: VideosPage,
  tv: TvPage,
  bank: BankPage,
  
};

export default TabContentMapping;
