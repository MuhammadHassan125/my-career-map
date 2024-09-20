import FacebookBtn from "./Login/FacebookBtn";
import GoogleBtn from "./Login/GoogleBtn";
import InstagramBtn from "./Login/InstagramBtn";
import LinkedinBtn from "./Login/LinkedinBtn";
import OutlookBtn from "./Login/OutlookBtn";

const SocialLinkComponent = () => {
    const SocialComponents = [
      { btn: [<OutlookBtn />, <LinkedinBtn />, <FacebookBtn />, <GoogleBtn />, <InstagramBtn />] },
    ];
  
    return (
      <div>
        {SocialComponents.map((item, key) => {
          return (
            <div className='signup-social-icons' key={key}>
              {item.btn.map((Component, i) => (
                <div className='social-icons-div' key={i}>
                  {Component}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default SocialLinkComponent;