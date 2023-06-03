require 'pagy/extras/metadata'

class MediaController < ApplicationController
  include Pagy::Backend

  before_action :authenticate_user!, only: :create

  # GET /media
  def index
    @pagy, @media = pagy(Medium.all)
    @pagy.vars[:metadata] = [
      :page_url,
      :next_url,
      :items,
      :count,
      :pages,
      :next
    ]

    render json: { media: @media, pagination: pagy_metadata(@pagy) }
  end

  # POST /media
  def create
    params = medium_params

    if !valid_url?(params[:url])
      render json: { errors: ['invalid video url'] }, status: :unprocessable_entity
      return
    end

    video = VideoInfo.get(params[:url])

    if !video.available?
      render json: { errors: ['can not get video info'] }, status: :unprocessable_entity
      return
    end

    @medium = Medium.new(
      name: video.title,
      description: video.description,
      thumbnail: video.thumbnail_medium,
      url: params[:url],
      user: current_user
    )

    if @medium.save
      render json: @medium, status: :created
    else
      render json: { errors: @medium.errors }, status: :unprocessable_entity
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def medium_params
      params.require(:medium).permit(:url)
    end

    # Should move logics into services
    def valid_url?(url)
      youtube_url_pattern = %r{(https?://)?(www\.)?(youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/v/|youtube\.com/playlist\?list=)([A-Za-z0-9_-]*)(&\S+)?}
      youtube_url_pattern.match?(url)
    end
end
