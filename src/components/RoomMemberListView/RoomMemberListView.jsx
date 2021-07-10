import React from 'react';
import {
	RoomMemberListViewStyled,
	MemberWrapper,
	MemberName,
	MemberJob,
	ProfileImageWrapper,
} from './RoomMemberListView.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import { ReactComponent as MikeIcon } from '../../assets/icon/icon-mike.svg';

const RoomMemberListView = ({ members }) => (
	<RoomMemberListViewStyled>
		{members.map(member => (
			<MemberWrapper key={member.id}>
				<MemberWrapper.Left>
					<ProfileImageWrapper>
						<ProfileImage size="medium" />
					</ProfileImageWrapper>
				</MemberWrapper.Left>
				<MemberWrapper.Right>
					<MemberName>{member.name}</MemberName>
					<MemberJob>{member.job}</MemberJob>
					<MikeIcon />
				</MemberWrapper.Right>
			</MemberWrapper>
		))}
	</RoomMemberListViewStyled>
);

export default RoomMemberListView;
