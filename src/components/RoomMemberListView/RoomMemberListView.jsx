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
import { ReactComponent as MikeOffIcon } from '../../assets/icon/icon-mike-off.svg';
import DefaultContext from '../../store/default';
import useAgora from '../../hooks/useAgora';

const RoomMemberListView = ({ members }) => {
	const { jobsMapping } = useContext(DefaultContext);
	const { remoteUsers } = useAgora();

	console.log(remoteUsers);

	return (
		<RoomMemberListViewStyled>
			{members.map(member => (
				<MemberWrapper key={member.userId} audio={remoteUsers[member.userId]}>
					<MemberWrapper.Left>
						<ProfileImageWrapper>
							<ProfileImage size="medium" url={member.imageUrl} />
						</ProfileImageWrapper>
					</MemberWrapper.Left>
					<MemberWrapper.Right>
						<MemberName>{member.nickname}</MemberName>
						<MemberJob>{jobsMapping[member.job]}</MemberJob>
						{remoteUsers[member.userId] === 'unmute' ? (
							<MikeIcon />
						) : (
							<MikeOffIcon />
						)}
					</MemberWrapper.Right>
				</MemberWrapper>
			))}
		</RoomMemberListViewStyled>
	);
};

export default RoomMemberListView;
