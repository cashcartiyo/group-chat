import React from 'react'
import { Channel,  MessageSimple,  } from 'stream-chat-react'

import { ChannelInner, CreateChannel, EditChannel, } from '.'


const ChannelContainer = ( { isCreating, setIsCreating,isEditing, setIsEditing,createType, } ) => {

  if(isCreating) {
    return (
      <div className='channel__container'>
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
    )
  }

  if(isEditing) {
    return (
      <div className='channel__container'>
        <EditChannel setIsEditing={setIsEditing}/>
      </div>
    )
  }

  const EmptyState = () => {
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>Here u go start chatting cuy thats what u wanted</p>
      <p className='channel-empty__second'>send anything what u want </p>
    </div>
  }

  return (
    <div className='channel__container'>
      <Channel
      EmptyStateIndicator={EmptyState}
      Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  )
}

export default ChannelContainer
