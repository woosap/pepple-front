import React, { useContext } from 'react';
import {
	RoomMemberListViewStyled,
	MemberWrapper,
	MemberName,
	MemberJob,
	ProfileImageWrapper,
} from './RoomMemberListView.styles';
import ProfileImage from '../ProfileImage/ProfileImage';
import { ReactComponent as MikeIcon } from '../../assets/icon/icon-mike.svg';
import DefaultContext from '../../store/default';

const RoomMemberListView = ({ members }) => {
	const { jobsMapping } = useContext(DefaultContext);
	return (
		<RoomMemberListViewStyled>
			{members.map(member => (
				<MemberWrapper key={member.userId}>
					<MemberWrapper.Left>
						<ProfileImageWrapper>
							<ProfileImage size="medium" />
						</ProfileImageWrapper>
					</MemberWrapper.Left>
					<MemberWrapper.Right>
						<MemberName>{member.nickname}</MemberName>
						<MemberJob>{jobsMapping[member.job]}</MemberJob>
						<MikeIcon />
					</MemberWrapper.Right>
				</MemberWrapper>
			))}
		</RoomMemberListViewStyled>
	);
};

export default RoomMemberListView;
