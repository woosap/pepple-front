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
import DefaultImage from '../../assets/img-default.svg';
import useAgora from '../../hooks/useAgora';

const RoomMemberListView = ({ members }) => {
	const { jobsMapping } = useContext(DefaultContext);
	const { tracks } = useAgora();

	return (
		<RoomMemberListViewStyled>
			{members.map(member => (
				<MemberWrapper key={member.userId} audio={tracks[member.userId]}>
					<MemberWrapper.Left>
						<ProfileImageWrapper audio={tracks[member.userId]}>
							<ProfileImage
								size="medium"
								url={member.imageUrl || DefaultImage}
							/>
						</ProfileImageWrapper>
					</MemberWrapper.Left>
					<MemberWrapper.Right>
						<MemberName audio={tracks[member.userId]}>
							{member.nickname}
						</MemberName>
						{member.job && <MemberJob>{jobsMapping[member.job]}</MemberJob>}
						{tracks[member.userId] === 'unmute' ? (
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
