<template>
  <div class="next-steps">
    <h2 class="my-5 text-center">How does it work?</h2>

    <div class="row">
      <div class="col-md-5 mb-4">
        <h4 class="mb-3">
            <font color="blue">
              1. Use any auth that offers IdP
            </font>
        </h4>
        <p>SourceSync works seamlessly with absolutely any valid identity provider (IdP). You can even write your own using open source tools like passport, openID, oidc-provider, IdentityServer, Gluu or WSO2</p>
          <h5>Popular Identity Providers</h5>
  <ul>
    <li><a href="https://auth0.com" target="_blank">Auth0</a></li>
    <li><a href="https://www.okta.com" target="_blank">Okta</a></li>
    <li><a href="https://azure.microsoft.com/en-us/services/active-directory" target="_blank">Azure Active Directory</a></li>
    <li><a href="https://aws.amazon.com/cognito" target="_blank">AWS Cognito</a></li>
    <li><a href="https://developers.google.com/identity" target="_blank">Google Identity Platform</a></li>
    <li><a href="https://www.onelogin.com" target="_blank">OneLogin</a></li>
    <li><a href="https://www.pingidentity.com" target="_blank">Ping Identity</a></li>
    <li><a href="https://www.ibm.com/security/verify" target="_blank">IBM Security Verify</a></li>
    <li><a href="https://www.oracle.com/identity-cloud-service" target="_blank">Oracle Identity Cloud Service</a></li>
    <li><a href="https://www.forgerock.com/platform/identity-platform" target="_blank">ForgeRock Identity Platform</a></li>
    <li><a href="https://www.keycloak.org" target="_blank">Keycloak</a></li>
    <li><a href="https://delinea.com" target="_blank">Centrify (now Delinea)</a></li>
    <li><a href="https://jumpcloud.com" target="_blank">JumpCloud</a></li>
    <li><a href="https://www.secureauth.com" target="_blank">SecureAuth</a></li>
    <li><a href="https://fusionauth.io" target="_blank">FusionAuth</a></li>
    <li><a href="https://www.salesforce.com/products/identity/overview" target="_blank">Salesforce Identity</a></li>
    <li><a href="https://wso2.com/identity-and-access-management" target="_blank">WSO2 Identity Server</a></li>
    <li><a href="https://www.gluu.org" target="_blank">Gluu</a></li>
    <li><a href="https://www.miniorange.com" target="_blank">miniOrange</a></li>
    <li><a href="https://identityserver.io" target="_blank">IdentityServer</a></li>
    <li>Over 100+ others</li>
    
  </ul>
      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h4 class="mb-3">
            <font color="blue">
              2. Enable IdP (if applicable)
            </font>
        </h4>
        <p>You might have to turn it on.</p>
      </div>
    </div>

    <div class="row">
      <div class="col-md-5 mb-4">
        <h4 class="mb-3">
            <font color="blue">
              3. Authorize SourceSync
            </font>
        </h4>
        <p>We only need 3 things:</p>
        <ol>
          <li>A list of URLs you'd like us to support for you.</li>
          <li>Your IdP Client Secret (you generate this in your IdP).</li>
          <li>Your IdP name (if you built it yourself or use custom URLs, we just need your auth, token and user info URLs)</li>
        </ol>
      </div>

      <div class="col-md"></div>

      <div class="col-md-5 mb-4">
        <h4 class="mb-3">
            <font color="blue">
              4. Connect to SourceSync
            </font>
        </h4>
        <p>You can simply iframe Kurator 3.0+ into any URL you've authorized and it will automatically syncronize with your users. That's literally it.</p>
        <p><i>Coming very soon, you can use our new app SDK to build your own version of Kurator!</i></p>
        <p><b>Note: You can utilize multitenancy as deeply as you wish by just letting us know which fields in your user data represent your client structure. We can setup our platform to respect any sort of permissions scheme you can come up with.</b></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeContent"
};
</script>
