import { useAuth } from '../../hooks'

const Profile = () => {
  const { userInfo } = useAuth()
  return (
    <>
      {userInfo && <>
        <div>
          <label>Email: </label>
          <span className="text">{userInfo.email}</span>
        </div>
        <div>
          <label>Roles: </label>
          <span className="text">{userInfo.roles.join(', ')}</span>
        </div>
      </>}
    </>
  )
}

export default Profile