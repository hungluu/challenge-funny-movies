class Auth::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up(resource_name, resource)
    sign_in(resource_name, resource, store: false)
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'success' }, status: :ok
    else
      errors = resource.errors&.full_messages.uniq || []
      render json: { message: 'failed', errors: errors }, status: :unprocessable_entity
    end
  end
end
