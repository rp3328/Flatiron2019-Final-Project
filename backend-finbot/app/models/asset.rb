class Asset < ApplicationRecord
    require 'HTTParty'

    belongs_to :asset_type
    belongs_to :user
    has_many :actions

    validates :close_price, presence: true
    

    def update_close_price
        if self.ticker_symbol == "USD"
            self.update(close_price: 1.0)
        elsif !(self.asset_type.name == "equity")

        else
        iex_url = 'https://cloud.iexapis.com/stable/stock/'
        response = HTTParty.get("#{iex_url}/#{self.ticker_symbol}/quote?&token=#{Figaro.env.iex_public_key}").body
            if valid_json?(response)
            parsed_response = JSON.parse(response)
            price = parsed_response["latestPrice"]
                if price.is_a?(Float)
                    self.update(close_price: price)
                else
                end
            else 
            end
        end
    end

    def valid_json?(json)
        JSON.parse(json)
        return true
      rescue JSON::ParserError => e
        return false
    end


end
