class Auth::SessionsController < Devise::SessionsController
  respond_to :json

  def auth_options
    super.merge({ store: false })
  end

  private

  def respond_with(resource, _opts = {})
    if user_signed_in?
      render json: { email: current_user.email, message: 'success' }, status: :ok
    else
      render json: { message: 'unauthorized' }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    if current_user?
      render json: { message: "success" }, status: :ok
    else
      render json: { message: "No user logged in"}, status: :unauthorized
    end
    current_user ? log_out_success : log_out_failure
  end
end
