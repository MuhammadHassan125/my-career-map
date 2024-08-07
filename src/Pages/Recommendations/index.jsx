import React from 'react'
import './index.scss'
import { Button } from '@mui/material'
const Recommendations = () => {
  return (
    <React.Fragment>
      <main className='recommendations-section'>
        <div className='recommendations-section__heading'>
          <h2>Skill Recommendations</h2>
          <p><strong>18 Skills matching</strong> with your preferences</p>
        </div>

        {/* skills info here  */}
        <div className='recommendations-section__info'>
          <div className='recommendations-section__info__inner'>
            <div>
              <div class="radial-01 radial-three-quarters">
                <span class="radial-01-number">
                  75<span class="radial-01-syb"><sup>%</sup></span>
                </span>
                <span class="radial-01-border-r"></span>
                <span class="radial-01-border-l"></span>
              </div>

              <div className='text'>
                <h4>Skill Title Name</h4>
                <p>Short description about lorem ipsum sir dolor</p>
              </div>
            </div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '6px',
                backgroundColor: '#3749A6',
                color: 'white',
                padding: '3px 20px',
                fontSize: '13px',
                textTransform: 'capitalize '
              }}
            >Apply</Button>
          </div>

          <div className='recommendations-section__info__inner'>
            <div>
              <div class="radial-01 radial-three-quarters">
                <span class="radial-01-number">
                  75<span class="radial-01-syb"><sup>%</sup></span>
                </span>
                <span class="radial-01-border-r"></span>
                <span class="radial-01-border-l"></span>
              </div>

              <div className='text'>
                <h4>Skill Title Name</h4>
                <p>Short description about lorem ipsum sir dolor</p>
              </div>
            </div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '6px',
                backgroundColor: '#3749A6',
                color: 'white',
                padding: '3px 20px',
                fontSize: '13px',
                textTransform: 'capitalize '
              }}
            >Apply</Button>
          </div>

          <div className='recommendations-section__info__inner'>
            <div>
              <div class="radial-01 radial-three-quarters">
                <span class="radial-01-number">
                  75<span class="radial-01-syb"><sup>%</sup></span>
                </span>
                <span class="radial-01-border-r"></span>
                <span class="radial-01-border-l"></span>
              </div>

              <div className='text'>
                <h4>Skill Title Name</h4>
                <p>Short description about lorem ipsum sir dolor</p>
              </div>
            </div>
            <Button
              variant='contained'
              sx={{
                borderRadius: '6px',
                backgroundColor: '#3749A6',
                color: 'white',
                padding: '3px 20px',
                fontSize: '13px',
                textTransform: 'capitalize '
              }}
            >Apply</Button>
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}

export default Recommendations