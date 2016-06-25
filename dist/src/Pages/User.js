import React from 'react';

const User = ({user}) =>  {

	console.log("In user: ", user)


	return(<div>
		<h1> {user.id} </h1>
		<h1> {user.firstname} </h1>
		<h1> {user.lastname} </h1>
	</div>);

}

export default User;

// import React from "react";

// const VideoListItem = ({video, onVideoSelect}) => {
// 	// const video = props.video;
// 	const imageUrl = video.snippet.thumbnails.default.url;

// 	return (
// 		<li onClick = {() =>onVideoSelect(video)}className = "list-group-item">
// 			<div className = "video-list media">
// 				<div className = "media-left">
// 					<img className = "media-object" src = {imageUrl} />
// 				</div>
// 				<div className = "media-body">
// 					<div className = "media-head">
// 						{video.snippet.title}
// 					</div>
// 				</div>
// 			</div>
// 		</li>
// 	);
// };

// export default VideoListItem;