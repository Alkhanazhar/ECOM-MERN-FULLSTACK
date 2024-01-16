import React from 'react'
import { useAuth } from '../../../context/auth'
import UserMenu from './UserMenu'

const Dashboard = () => {
    const [auth]=useAuth()
  return <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4>{auth?.user?.name}</h4>
              <h4>{auth?.user?.email}</h4>
              <h4>{auth?.user?.address}</h4>
            </div>
          </div>
        </div>
      </div>
  
}

export default Dashboard
