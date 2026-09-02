import React, { useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

const platformColors = {
  'Instagram': { bg: '#CDB4DB', border: '#B598C9', text: '#343434' },
  'LinkedIn': { bg: '#BDE0FE', border: '#98C8EB', text: '#343434' },
  'Facebook': { bg: '#FFF1B6', border: '#E6D690', text: '#343434' },
  'Twitter/X': { bg: '#FFD6A5', border: '#E5BE8C', text: '#343434' }
}

const statusBadgeColors = {
  'Draft': '#E8E8E8',
  'Scheduled': '#A8DADC',
  'Published': '#BDE0FE'
}

const CalendarView = React.memo(function CalendarView({ events, onEventClick, onEventDrop }) {

  const handleEventClick = useCallback((info) => {
    const postId = parseInt(info.event.id, 10)
    onEventClick(postId)
  }, [onEventClick])

  const handleEventDrop = useCallback((info) => {
    const postId = parseInt(info.event.id, 10)
    const newDate = info.event.startStr.split('T')[0]
    const newTime = info.event.start.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    onEventDrop(postId, newDate, newTime)
    info.revert()
  }, [onEventDrop])

  const renderEventContent = useCallback((eventInfo) => {
    const post = eventInfo.event.extendedProps.post
    if (!post) return null

    const colors = platformColors[post.platform] || { bg: '#A8DADC', text: '#343434' }
    return (
      <div
        className="fc-event-inner"
        style={{ backgroundColor: colors.bg, color: colors.text, padding: '4px 8px', borderRadius: '6px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div className="fc-event-platform" style={{ fontSize: '10px', fontWeight: '700', opacity: 0.85 }}>
          {post.platform}
        </div>
        <div className="fc-event-title" style={{ fontSize: '12px', fontWeight: '600', margin: '2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {post.title}
        </div>
        <div className="fc-event-time" style={{ fontSize: '10px', opacity: 0.8 }}>
          {post.time} · {post.status}
        </div>
      </div>
    )
  }, [])

  return (
    <div className="calendar-container" data-testid="calendar-view">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        editable={true}
        droppable={true}
        events={events}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventContent={renderEventContent}
        height={'auto'}
        aspectRatio={1.8}
        eventDisplay={'block'}
        displayEventEnd={false}
        dayMaxEventRows={4}
        buttonText={{
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day'
        }}
      />
    </div>
  )
})

export function postToEvent(post) {
  const colors = platformColors[post.platform] || { bg: '#A8DADC', border: '#8FC8C8', text: '#343434' }
  const startStr = `${post.date}T${post.time}:00`
  const endDate = new Date(`${post.date}T${post.time}:00`)
  endDate.setHours(endDate.getHours() + 1)
  return {
    id: String(post.id),
    title: post.title,
    start: startStr,
    end: endDate.toISOString(),
    backgroundColor: colors.bg,
    borderColor: colors.border,
    textColor: colors.text,
    extendedProps: { post, platform: post.platform, status: post.status },
    className: `fc-event-${post.platform.toLowerCase().replace(/[^a-z]/g, '')}`
  }
}

export { platformColors, statusBadgeColors }
export default CalendarView
