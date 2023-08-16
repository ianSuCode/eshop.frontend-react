const Home = () => {
  return (
    <div>
      <div>
        <h3>Features:</h3>
        <ul>
          <li>User Registration: Users can sign up as new members and will await activation by an admin.</li>
          <li>Token Expiration: Automatically redirect to the login page when the token expires.</li>
          <li>Shopping Cart: Users can add items to the shopping cart and proceed to checkout.</li>
          <li>Batch Ordering: Users can place orders in batches, enabling more efficient purchasing.</li>
          <li>Account Page: Users can view their personal information and order on their account page.</li>
          <li><mark><strong>Admin Role</strong></mark>: Users with Admin Role can access and manage all User accounts and
            Orders.</li>
        </ul>
      </div>
    </div>)
}

export default Home