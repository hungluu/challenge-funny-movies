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
    render json: { message: "success" }, status: :ok
  end
end
